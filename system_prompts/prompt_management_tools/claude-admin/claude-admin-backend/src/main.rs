mod app;
mod domain;
mod infra;
mod routes;
mod services;

use std::io::Write;
use std::net::SocketAddr;
use tokio::net::TcpListener;

use app::create_app;
use infra::config::Config;
use infra::logging;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    logging::init();

    let config = Config::load();

    let host: std::net::IpAddr = config
        .host
        .parse()
        .unwrap_or_else(|_| std::net::IpAddr::V4(std::net::Ipv4Addr::new(127, 0, 0, 1)));
    let addr = SocketAddr::from((host, config.port));

    // Check if port is already in use and offer to kill the old process
    if std::net::TcpListener::bind(addr).is_err() {
        if let Some(pid) = find_pid_on_port(config.port) {
            eprint!(
                "Port {} is already in use by PID {}. Kill it and restart? [Y/n] ",
                config.port, pid
            );
            std::io::stderr().flush().ok();

            let mut input = String::new();
            std::io::stdin().read_line(&mut input).ok();
            let answer = input.trim().to_lowercase();

            if answer.is_empty()
                || answer == "y"
                || answer == "yes"
                || answer == "j"
                || answer == "ja"
            {
                #[cfg(unix)]
                {
                    use std::process::Command;
                    let _ = Command::new("kill").arg(pid.to_string()).status();
                    // Wait briefly for the process to release the port
                    std::thread::sleep(std::time::Duration::from_millis(500));
                    tracing::info!("Killed previous instance (PID {})", pid);
                }
                #[cfg(windows)]
                {
                    use std::process::Command;
                    let status = Command::new("taskkill")
                        .args(["/PID", &pid.to_string(), "/F"])
                        .status();
                    match status {
                        Ok(s) if s.success() => {
                            std::thread::sleep(std::time::Duration::from_millis(500));
                            tracing::info!("Killed previous instance (PID {})", pid);
                        }
                        _ => {
                            eprintln!(
                                "Could not terminate PID {}. \
                                 Please close the existing ClaudeAdmin window and retry.",
                                pid
                            );
                            std::process::exit(1);
                        }
                    }
                }
                #[cfg(not(any(unix, windows)))]
                {
                    eprintln!("Automatic process termination is not supported on this platform.");
                    std::process::exit(1);
                }
            } else {
                eprintln!("Aborted.");
                std::process::exit(0);
            }
        } else {
            return Err(format!("Port {} is already in use", config.port).into());
        }
    }

    let app = create_app(config.clone()).await?;

    tracing::info!("ClaudeAdmin backend starting on http://{}", addr);

    let listener = TcpListener::bind(addr).await?;
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

/// Find the PID of a process listening on the given port.
/// Uses `lsof` on Unix and `netstat` on Windows.
fn find_pid_on_port(port: u16) -> Option<u32> {
    #[cfg(unix)]
    {
        use std::process::Command;
        let output = Command::new("lsof")
            .args(["-ti", &format!(":{}", port)])
            .output()
            .ok()?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        stdout.lines().next()?.trim().parse().ok()
    }
    #[cfg(windows)]
    {
        use std::process::Command;
        // netstat -ano prints lines like: TCP 0.0.0.0:9022 ... LISTENING 1234
        let output = Command::new("netstat").args(["-ano"]).output().ok()?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        for line in stdout.lines() {
            let line = line.trim();
            if line.contains(&format!(":{}", port)) && line.contains("LISTENING") {
                // last field is PID
                if let Some(pid_str) = line.split_whitespace().last() {
                    return pid_str.parse().ok();
                }
            }
        }
        None
    }
    #[cfg(not(any(unix, windows)))]
    {
        None
    }
}

async fn shutdown_signal() {
    #[cfg(unix)]
    {
        use tokio::signal::unix::{signal, SignalKind};
        let mut term = signal(SignalKind::terminate()).expect("failed to install SIGTERM handler");
        tokio::select! {
            _ = tokio::signal::ctrl_c() => {
                tracing::info!("Shutdown: ctrl_c");
            }
            _ = term.recv() => {
                tracing::info!("Shutdown: SIGTERM");
            }
        }
    }

    #[cfg(not(unix))]
    {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    }
}
