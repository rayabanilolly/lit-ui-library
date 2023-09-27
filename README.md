# Bit workspace for Lit components

This workspace contains a set of independently versioned and published [Lit](https://lit.dev/) components.

## Setup workspace

1. [Install Bit on your system](https://bit.dev/docs/getting-started/installing-bit/installing-bit)).
1. Clone this repository.
1. Run `bit install`.

## Using Bit

See the [bit docs](https://bit.dev/docs) for instructions and tutorials on using bit.

## Create new lit components

Use the built-in templates this workspace includes - run `bit templates` to see the available templates, e.g. `lit-component` - to create
new components with included scaffolding for files that utilise bit features such as in-component documentation and component examples (compositions)
 

## Maintainer docs

There are two files to be aware of when working with Bit:

- **workspace.jsonc** This is the main configuration file of your bit workspace. Here you can configure dependency rules for components, manage their scopes and configure custom aspects to be used in the workspace
You can also control aesthetic aspects of the workspace such as name and icon as well as default directory and scope. 
It is where dependencies are found when you install anything.
  
- **.bitmap** This is an auto-generated file and includes the directory mapping of your components.

