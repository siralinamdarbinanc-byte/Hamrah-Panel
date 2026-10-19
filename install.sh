#!/bin/bash
# Hamrah Panel installer (Linux / Android Termux / macOS)
# Uses the official BPB Wizard binary + THIS repo's worker.js.
#   bash <(curl -fsSL https://raw.githubusercontent.com/siralinamdarbinanc-byte/Hamrah-Panel/main/install.sh)
set -u

OWNER_REPO="${HAMRAH_REPO:-siralinamdarbinanc-byte/Hamrah-Panel}"
WIZARD_REPO="${WIZARD_REPO:-bia-pain-bache/BPB-Wizard}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/hamrah}"

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$(uname -m)" in
  aarch64|arm64) ARCH=arm64 ;;
  armv7*|armv8*) ARCH=arm ;;
  x86_64)        ARCH=amd64 ;;
  i386|i686)     ARCH=386 ;;
  *) echo "Unsupported architecture: $(uname -m)"; exit 1 ;;
esac
case "$OS" in linux|darwin) ;; *) echo "Unsupported OS: $OS"; exit 1 ;; esac
EXT="tar.gz"; [ "$OS" = "darwin" ] && EXT="zip"

ARCHIVE="BPB-Wizard-${OS}-${ARCH}.${EXT}"
WIZARD_URL="${WIZARD_URL:-https://github.com/${WIZARD_REPO}/releases/latest/download/${ARCHIVE}}"
WORKER_URL="${WORKER_URL:-https://github.com/${OWNER_REPO}/releases/latest/download/worker.js}"

dl() { # url out
  curl -fL --retry 5 --retry-delay 2 --retry-all-errors --connect-timeout 20 -# -o "$2" "$1"
}

mkdir -p "$INSTALL_DIR" && cd "$INSTALL_DIR" || exit 1

if [ ! -x ./wizard ]; then
  echo "Downloading Wizard ($ARCHIVE)..."
  dl "$WIZARD_URL" "$ARCHIVE" || { echo "Failed to download Wizard. Check your connection/VPN, or set WIZARD_URL=<url or local file URL>."; exit 1; }
  if [ "$EXT" = "zip" ]; then unzip -q -o "$ARCHIVE"; else tar xzf "$ARCHIVE"; fi
  rm -f "$ARCHIVE"; chmod +x ./wizard
fi

echo "Downloading Hamrah worker.js..."
dl "$WORKER_URL" worker.js || { echo "Failed to download worker.js."; exit 1; }

export LAUNCHED_BY_SCRIPT=1
exec ./wizard
