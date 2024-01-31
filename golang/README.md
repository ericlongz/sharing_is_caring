# Start Go Project

The easiest way to work on multiple modules in Go 1.18 and later is therefore to create a go.work file containing the modules you wish to work on, and set your workspace root to the directory containing the go.work file.

For example, suppose this repo is checked out into the $WORK/tools directory. We can work on both golang.org/x/tools and golang.org/x/tools/gopls simultaneously by creating a go.work file using go work init, followed by go work use MODULE_DIRECTORIES... to add directories containing go.mod files to the workspace:

cd $WORK
go work init
go work use ./tools/ ./tools/gopls/
