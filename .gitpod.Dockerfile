FROM gitpod/workspace-node

RUN sudo apt-get update \
    && sudo apt-get upgrade

# Install latest version of pnpm
# RUN pnpm i -g pnpm

# Install 7.0.0-rc.6 version of pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | PNPM_VERSION=7.0.0-rc.6 sh -