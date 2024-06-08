# Bun WebSockets

A simple WebSocket server to get started using Bun.

![](../../actions/workflows/ci.yml/badge.svg)

[![](https://railway.app/button.svg)](https://railway.app/template/BLofAq?referralCode=bonus)

## Prerequisites

- [<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/17180392/266803654-ac5f086c-71ec-493a-a377-784cec2dc525.svg" height=19.2 align=center /> Bun](https://bun.sh/) `>=1.0.0`
  - [All-in-one toolkit](https://bun.sh/blog/bun-v1.0#bun-is-an-all-in-one-toolkit)
  - [JavaScript runtime](https://bun.sh/blog/bun-v1.0#bun-is-a-javascript-runtime)
  - [Package manager](https://bun.sh/blog/bun-v1.0#bun-is-a-package-manager)
  - [Test runner](https://bun.sh/blog/bun-v1.0#bun-is-a-test-runner)
  - [Bundler](https://bun.sh/blog/bun-v1.0#bun-is-a-bundler)

## Getting Started

1.  **[Deploy on Railway](https://railway.app/template/BLofAq?referralCode=bonus)** or **[use this template](https://github.com/dayblox/bun-ws/generate)**

2.  **Clone** the repository

3.  **Install** dependencies

    ```sh
    bun i
    ```

## Usage

- **Development** mode (**debug**)

  `F5`

- Connecting to the Server using a WebSocket client

  ```sh
  bunx wscat -c ws://localhost:3000
  ```

- Running **tests** (**watch** mode)

  ```sh
  bun test --watch
  ```

- **Production** mode

  ```sh
  bun src/index.ts
  ```