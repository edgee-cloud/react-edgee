{
  description = "Edgee Console";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ nodejs_20 ];

          shellHook = ''
            export $(grep -v '^#' .env | xargs -d '\n')
            export PATH=./node_modules/.bin/:$PATH
          '';
        };
      });
}
