# Use the official Node.js image as base
FROM mcr.microsoft.com/devcontainers/javascript-node:0-20

# Install additional OS packages including GraphViz
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    graphviz \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set the default shell to bash instead of sh
ENV SHELL /bin/bash
