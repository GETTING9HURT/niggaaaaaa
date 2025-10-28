{
  description = "A Next.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };

        # Use a specific, stable Node.js version
        nodejs = pkgs.nodejs_20;

        # FHS env to provide a more standard linux filesystem layout
        fhs = pkgs.buildFHSUserEnv {
          name = "nextjs-env";
          targetPkgs = pkgs: (with pkgs; [
            nodejs
            coreutils
            findutils
            gnumake
            unzip
            deploy-rs
            # Add other system dependencies here if needed
          ]);
          runScript = "bash";
        };

      in
      {
        devShell = pkgs.mkShell {
          # Use the FHS environment
          nativeBuildInputs = [ fhs ];

          # Environment variables
          shellHook = ''
            export NODE_MODULES_DIR="$PWD/node_modules"
            export PATH="$NODE_MODULES_DIR/.bin:$PATH"
            echo "Nix-shell for Next.js is ready."
            echo "Run 'npm install' if you haven't already."
          '';
        };
      }
    );
}
