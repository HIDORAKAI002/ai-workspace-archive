{
  description =
    "Deploy prompts, agents, skills, and MCP servers to multiple AI coding tools";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        python = pkgs.python312;

        pythonWithDeps = python.withPackages (ps:
          with ps; [
            pyyaml
            pytest
            pytest-cov
            mypy
          ]);

        src = ./.;

        promptdeploy = python.pkgs.buildPythonApplication {
          pname = "promptdeploy";
          version = "0.1.0";
          pyproject = true;

          inherit src;

          build-system = [
            python.pkgs.setuptools
            python.pkgs.wheel
          ];

          dependencies = with python.pkgs; [
            pyyaml
          ];

          doCheck = false;

          meta = {
            description =
              "Deploy prompts, agents, skills, and MCP servers to multiple AI coding tools";
            mainProgram = "promptdeploy";
          };
        };
      in {
        packages.default = promptdeploy;

        checks = {
          ruff-format = pkgs.runCommand "ruff-format" { nativeBuildInputs = [ pkgs.ruff ]; } ''
            ruff format --no-cache --check ${src}
            touch $out
          '';

          ruff-lint = pkgs.runCommand "ruff-lint" { nativeBuildInputs = [ pkgs.ruff ]; } ''
            ruff check --no-cache ${src}
            touch $out
          '';

          mypy = pkgs.runCommand "mypy" { nativeBuildInputs = [ pythonWithDeps ]; } ''
            cp -r ${src} $TMPDIR/src && chmod -R u+w $TMPDIR/src
            cd $TMPDIR/src
            PYTHONPATH=src mypy src/ tests/
            touch $out
          '';

          pytest = pkgs.runCommand "pytest" {
            nativeBuildInputs = [ pythonWithDeps pkgs.rsync pkgs.openssh ];
          } ''
            cp -r ${src} $TMPDIR/src && chmod -R u+w $TMPDIR/src
            cd $TMPDIR/src
            PYTHONPATH=src python -m pytest tests/ -x -q --cov --cov-report=term-missing
            touch $out
          '';

          build = promptdeploy;
        };

        devShells.default = pkgs.mkShell {
          packages = [
            pythonWithDeps
            pkgs.ruff
            pkgs.lefthook
          ];
        };
      })
    // {
      homeManagerModules.default = import ./nix/hm-module.nix;
    };
}
