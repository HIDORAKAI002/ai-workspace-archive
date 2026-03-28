use crate::domain::errors::ApiError;

/// Encode a filesystem path to the format used in ~/.claude/projects/
/// e.g. /home/user/projects/my-app -> -home-user-projects-my-app
pub fn encode_project_path(path: &str) -> String {
    path.replace('/', "-")
}

/// Decode a project ID back to a filesystem path.
/// The ID is a base64url-encoded or slash-replaced path.
pub fn decode_project_id(id: &str) -> Result<String, ApiError> {
    // Try URL-safe base64 first
    if let Ok(bytes) = base64url_decode(id) {
        if let Ok(path) = String::from_utf8(bytes) {
            if path.starts_with('/') {
                return Ok(path);
            }
        }
    }

    // Try percent-decoding
    let decoded = percent_decode(id);
    if decoded.starts_with('/') {
        return Ok(decoded);
    }

    Err(ApiError::BadRequest(format!("Invalid project ID: {}", id)))
}

/// Encode a project path as a URL-safe ID
pub fn encode_project_id(path: &str) -> String {
    base64url_encode(path.as_bytes())
}

fn base64url_encode(data: &[u8]) -> String {
    use std::fmt::Write;
    let mut result = String::new();
    let chars = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    let mut i = 0;
    while i < data.len() {
        let b0 = data[i] as u32;
        let b1 = if i + 1 < data.len() {
            data[i + 1] as u32
        } else {
            0
        };
        let b2 = if i + 2 < data.len() {
            data[i + 2] as u32
        } else {
            0
        };

        let triple = (b0 << 16) | (b1 << 8) | b2;

        let _ = write!(
            result,
            "{}",
            chars[((triple >> 18) & 0x3F) as usize] as char
        );
        let _ = write!(
            result,
            "{}",
            chars[((triple >> 12) & 0x3F) as usize] as char
        );

        if i + 1 < data.len() {
            let _ = write!(result, "{}", chars[((triple >> 6) & 0x3F) as usize] as char);
        }
        if i + 2 < data.len() {
            let _ = write!(result, "{}", chars[(triple & 0x3F) as usize] as char);
        }

        i += 3;
    }

    result
}

fn base64url_decode(input: &str) -> Result<Vec<u8>, ()> {
    let mut bytes = Vec::new();
    let chars: Vec<u8> = input.bytes().collect();

    let val = |c: u8| -> Result<u32, ()> {
        match c {
            b'A'..=b'Z' => Ok((c - b'A') as u32),
            b'a'..=b'z' => Ok((c - b'a' + 26) as u32),
            b'0'..=b'9' => Ok((c - b'0' + 52) as u32),
            b'-' => Ok(62),
            b'_' => Ok(63),
            _ => Err(()),
        }
    };

    let mut i = 0;
    while i < chars.len() {
        let c0 = val(chars[i])?;
        let c1 = if i + 1 < chars.len() {
            val(chars[i + 1])?
        } else {
            0
        };
        let c2 = if i + 2 < chars.len() {
            val(chars[i + 2])?
        } else {
            0
        };
        let c3 = if i + 3 < chars.len() {
            val(chars[i + 3])?
        } else {
            0
        };

        let triple = (c0 << 18) | (c1 << 12) | (c2 << 6) | c3;

        bytes.push(((triple >> 16) & 0xFF) as u8);
        if i + 2 < chars.len() {
            bytes.push(((triple >> 8) & 0xFF) as u8);
        }
        if i + 3 < chars.len() {
            bytes.push((triple & 0xFF) as u8);
        }

        i += 4;
    }

    Ok(bytes)
}

fn percent_decode(input: &str) -> String {
    let mut result = String::new();
    let mut chars = input.chars();

    while let Some(c) = chars.next() {
        if c == '%' {
            let hex: String = chars.by_ref().take(2).collect();
            if let Ok(byte) = u8::from_str_radix(&hex, 16) {
                result.push(byte as char);
            } else {
                result.push('%');
                result.push_str(&hex);
            }
        } else {
            result.push(c);
        }
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encode_project_path() {
        assert_eq!(
            encode_project_path("/Users/conrad/Projects/Foo"),
            "-Users-conrad-Projects-Foo"
        );
    }

    #[test]
    fn test_roundtrip_base64url() {
        let path = "/home/user/projects/my-app";
        let encoded = encode_project_id(path);
        let decoded = decode_project_id(&encoded).unwrap();
        assert_eq!(decoded, path);
    }
}
