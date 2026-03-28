# Home-manager module for promptdeploy.
#
# Runs "promptdeploy deploy" during home-manager activation so that
# agents, commands, skills, MCP servers, hooks, and models are kept
# in sync with the source repository on every system rebuild.
{ config, lib, ... }:

let
  cfg = config.programs.promptdeploy;

  targetArgs =
    if cfg.targets == [ ] then
      ""
    else
      lib.concatMapStringsSep " " (t: "--target ${lib.escapeShellArg t}") cfg.targets;
in
{
  options.programs.promptdeploy = {
    enable = lib.mkEnableOption "promptdeploy deployment during home-manager activation";

    package = lib.mkOption {
      type = lib.types.package;
      description = "The promptdeploy package to use.";
    };

    sourceDir = lib.mkOption {
      type = lib.types.str;
      description = "Path to the promptdeploy source directory containing deploy.yaml.";
    };

    targets = lib.mkOption {
      type = lib.types.listOf lib.types.str;
      default = [ ];
      description = ''
        Target labels or IDs to deploy to.  When empty, all targets
        (including remote) are deployed.
      '';
    };
  };

  config = lib.mkIf cfg.enable {
    home.activation.promptdeploy = lib.hm.dag.entryAfter [ "writeBoundary" ] ''
      if [[ -d "${cfg.sourceDir}" ]]; then
        ( cd "${cfg.sourceDir}" && \
          ${lib.getExe cfg.package} deploy ${targetArgs} --quiet
        ) || true
      fi
    '';
  };
}
