{
  "description": "A Next.js project development environment",
  "inputs": {
    "nixpkgs": {
      "url": "github:NixOS/nixpkgs/nixos-unstable"
    },
    "flake-utils": {
      "url": "github:numtide/flake-utils"
    }
  },
  "outputs": {
    "self": _,
    "nixpkgs": _,
    "flake-utils": flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        "devShell": pkgs.mkShell {
          "buildInputs": [
            pkgs.nodejs-20_x
            pkgs.nodePackages.pnpm
            pkgs.deploy-rs
          ];
        };
      }
    )
}