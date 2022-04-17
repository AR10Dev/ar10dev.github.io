FROM gitpod/workspace-node

# Install latest version of pnpm
# RUN pnpm i -g pnpm

# Install 7.0.0-rc.6 version of pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | PNPM_VERSION=7.0.0-rc.6 sh -
