function init() {
  // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
  // For details, see https://gojs.net/latest/intro/buildingObjects.html
  const $ = go.GraphObject.make;

  myDiagram = $(
    go.Diagram,
    "myDiagramDiv", // create a Diagram for the DIV HTML element
    {
      layout: $(go.TreeLayout, {
        angle: 90,
        setsPortSpot: false,
        setsChildPortSpot: false,
        arrangement: go.TreeLayout.ArrangementHorizontal,
      }),
      "undoManager.isEnabled": true,
      // When a Node is deleted by the user, also delete all of its Comment Nodes.
      // When a Comment Link is deleted, also delete the corresponding Comment Node.
      SelectionDeleting: (e) => {
        var parts = e.subject; // the collection of Parts to be deleted, the Diagram.selection
        // iterate over a copy of this collection,
        // because we may add to the collection by selecting more Parts
        parts.copy().each((p) => {
          if (p instanceof go.Node) {
            var node = p;
            node.findNodesConnected().each((n) => {
              // remove every Comment Node that is connected with this node
              if (n.category === "Comment") {
                n.isSelected = true; // include in normal deletion process
              }
            });
          } else if (p instanceof go.Link && p.category === "Comment") {
            var comlink = p; // a "Comment" Link
            var comnode = comlink.fromNode;
            // remove the Comment Node that is associated with this Comment Link,
            if (comnode.category === "Comment") {
              comnode.isSelected = true; // include in normal deletion process
            }
          }
        });
      },
    }
  );

  myDiagram.nodeTemplate = $(
    "Node",
    "Auto",
    $("Shape", { fill: "white" }, new go.Binding("fill", "color")),
    $("TextBlock", { margin: 6 }, new go.Binding("text"))
  );

  myDiagram.linkTemplate = $(
    "Link",
    $("Shape", { strokeWidth: 1.5 }),
    $("Shape", { toArrow: "Standard", stroke: null })
  );

  myDiagram.nodeTemplateMap.add(
    "Comment",
    $(
      go.Node, // this needs to act as a rectangular shape for BalloonLink,
      { background: "transparent" }, // which can be accomplished by setting the background.
      $(go.TextBlock, { stroke: "brown", margin: 3 }, new go.Binding("text"))
    )
  );

  myDiagram.linkTemplateMap.add(
    "Comment",
    // if the BalloonLink class has been loaded from the Extensions directory, use it
    $(
      typeof BalloonLink === "function" ? BalloonLink : go.Link,
      $(
        go.Shape, // the Shape.geometry will be computed to surround the comment node and
        // point all the way to the commented node
        { stroke: "brown", strokeWidth: 1, fill: "lightyellow" }
      )
    )
  );

  myDiagram.model = new go.GraphLinksModel({
    nodeDataArray: nodeData,
    linkDataArray: linkData,
  });
}
window.addEventListener("DOMContentLoaded", init);
