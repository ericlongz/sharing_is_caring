const $ = go.GraphObject.make;

// define colored links container
var linksArray = [];
var highlightedLinkColor = "orange";
var cxElement = document.getElementById("contextMenu");

var myContextMenu = $(go.HTMLInfo, {
  show: showContextMenu,
  hide: hideContextMenu,
});

const myDiagram = new go.Diagram("myDiagramDiv", {
  // enable Ctrl-Z to undo and Ctrl-Y to redo
  "undoManager.isEnabled": false,
  allowMove: false,
  layout: $(go.GridLayout, { wrappingColumn: 2, wrappingWidth: 999999999 }),
});

// define a simple Node template
myDiagram.nodeTemplate = $(
  go.Node,
  "Auto",
  {
    contextMenu: myContextMenu,
    zOrder: 2,
  },
  $(
    go.Shape,
    "Rectangle",
    new go.Binding("fill", "color"),
    new go.Binding("stroke", "isHighlighted", function (h) {
      return h ? "orange" : "black";
    }).ofObject()
  ),
  $(
    go.Panel,
    "Horizontal",
    $(
      go.TextBlock,
      "Default Text",
      {
        margin: new go.Margin(12, 2, 10, 8),
        editable: true,
        textAlign: "left",
        font: "12px sans-serif",
      },
      new go.Binding("text", "name")
    ),
    // define the panel where the text will appear
    $(
      go.Panel,
      "Table",
      {
        maxSize: new go.Size(150, 999),
        margin: new go.Margin(0, 0, 0, 0),
        defaultAlignment: go.Spot.Left,
      },
      $(go.RowColumnDefinition, { column: 2 })
    ),
    $(
      go.Picture,
      {
        margin: new go.Margin(10, 5, 10, 5),
        width: 15,
        height: 15,
      },
      new go.Binding("source")
    )
  ),
  {
    // a mouse-over highlights the link from selected node to other node(s):
    click: function (e, node) {
      // when the user clicks on a Node, highlight all Links coming out of the node
      // and all of the Nodes at the other ends of those Links.
      // highlight all Links and Nodes coming out of a given Node
      var diagram = node.diagram;
      diagram.startTransaction("highlight");
      // remove any previous highlighting
      diagram.clearHighlighteds();
      // for each Node destination for the Node, set Node.isHighlighted
      node.findNodesOutOf().each(function (n) {
        n.isHighlighted = true;
      });
      node.findNodesInto().each(function (n) {
        n.isHighlighted = true;
      });
      diagram.commitTransaction("highlight");
      for (let x in linksArray) {
        linksArray[x].elt(0).stroke = "#D3D3D3";
        linksArray[x].elt(0).strokeWidth = 2;
        myDiagram.model.set(linksArray[x], "zOrder", linksArray[x].zOrder - 1);
      }
      linksArray = [];
      if (node.findLinksOutOf().next() === true) {
        var it = node.findLinksOutOf().iterator;
        while (it.next()) {
          linksArray.push(it.value);
          it.value.elt(0).stroke = highlightedLinkColor;
          it.value.elt(0).strokeWidth = 4;
          myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
        }
      }
      if (node.findLinksInto().next() === true) {
        var it = node.findLinksInto().iterator;
        while (it.next()) {
          linksArray.push(it.value);
          it.value.elt(0).stroke = highlightedLinkColor;
          it.value.elt(0).strokeWidth = 4;
          myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
        }
      }
    },
    contextClick: function (e, node) {
      // when the user clicks on a Node, highlight all Links coming out of the node
      // and all of the Nodes at the other ends of those Links.
      // highlight all Links and Nodes coming out of a given Node
      var diagram = node.diagram;
      diagram.startTransaction("highlight");
      // remove any previous highlighting
      diagram.clearHighlighteds();
      // for each Node destination for the Node, set Node.isHighlighted
      node.findNodesOutOf().each(function (n) {
        n.isHighlighted = true;
      });
      node.findNodesInto().each(function (n) {
        n.isHighlighted = true;
      });
      diagram.commitTransaction("highlight");
      for (let x in linksArray) {
        linksArray[x].elt(0).stroke = "#D3D3D3";
        linksArray[x].elt(0).strokeWidth = 2;
        myDiagram.model.set(linksArray[x], "zOrder", linksArray[x].zOrder - 1);
      }
      linksArray = [];
      if (node.findLinksOutOf().next() === true) {
        var it = node.findLinksOutOf().iterator;
        while (it.next()) {
          linksArray.push(it.value);
          it.value.elt(0).stroke = highlightedLinkColor;
          it.value.elt(0).strokeWidth = 4;
          myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
        }
      }
      if (node.findLinksInto().next() === true) {
        var it = node.findLinksInto().iterator;
        while (it.next()) {
          linksArray.push(it.value);
          it.value.elt(0).stroke = highlightedLinkColor;
          it.value.elt(0).strokeWidth = 4;
          myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
        }
      }
    },
  }
);

myDiagram.linkTemplate = $(
  go.Link,
  // default routing is go.Link.Orthogonal for complex diagram
  // default corner is 0
  { routing: go.Link.Normal, corner: 0, zOrder: 0, selectable: false },
  // the link path, a Shape
  $(go.Shape, { strokeWidth: 2, stroke: "#D3D3D3" }),
  // if we wanted an arrowhead we would also add another Shape with toArrow defined:
  $(go.Shape, { toArrow: "Standard", stroke: null })
);

// when the user clicks on the background of the Diagram, remove all highlighting
myDiagram.click = function (e) {
  myDiagram.clearHighlighteds();
  for (let x in linksArray) {
    linksArray[x].elt(0).stroke = "#D3D3D3";
    linksArray[x].elt(0).strokeWidth = 2;
    myDiagram.model.set(linksArray[x], "zOrder", linksArray[x].zOrder - 1);
  }
  linksArray = [];
};

// when the user right clicks on the background of the Diagram, remove all highlighting
myDiagram.contextClick = function (e) {
  myDiagram.clearHighlighteds();
  for (let x in linksArray) {
    linksArray[x].elt(0).stroke = "#D3D3D3";
    linksArray[x].elt(0).strokeWidth = 2;
    myDiagram.model.set(linksArray[x], "zOrder", linksArray[x].zOrder - 1);
  }
  linksArray = [];
};

myDiagram.contextMenu = myContextMenu;

myDiagram.groupTemplateMap.add(
  "TL",
  $(
    go.Group,
    "Auto",
    { zOrder: -1 },
    {
      selectable: false,
      layout: $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 35,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        alignment: go.TreeLayout.AlignmentCenterChildren,
        treeStyle: go.TreeLayout.StyleRootOnly,
        alternateAngle: 90,
      }),
    },
    $(go.Shape, { fill: "white", stroke: "white" }),
    $(go.Placeholder, { padding: 10 })
  )
);

myDiagram.groupTemplateMap.add(
  "GL",
  $(
    go.Group,
    "Auto",
    {
      selectable: false,
      layout: $(go.GridLayout, {
        wrappingColumn: 50,
        wrappingWidth: 999999999,
        sorting: go.GridLayout.Ascending,
      }),
    },
    $(go.Shape, { fill: "white", stroke: "white" }),
    $(go.Placeholder, { padding: 10 })
  )
);

myDiagram.model = new go.GraphLinksModel(
  // note that each node data object holds whatever properties it needs;
  // for this app we add the "name" and "source" properties
  // because in our template above, we have defined a bindings to expect them
  nodeData,
  linkData
);

// We don't want the div acting as a context menu to have a (browser) context menu!
cxElement.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();
    return false;
  },
  false
);

function hideCX() {
  if (myDiagram.currentTool instanceof go.ContextMenuTool) {
    myDiagram.currentTool.doCancel();
  }
}

function showContextMenu(obj, diagram) {
  // Show only the relevant buttons given the current state.
  var rootLiPred = document.getElementById("predecessor");
  while (rootLiPred.firstElementChild) {
    rootLiPred.removeChild(rootLiPred.firstElementChild);
  }
  var rootLiSucc = document.getElementById("successor");
  while (rootLiSucc.firstElementChild) {
    rootLiSucc.removeChild(rootLiSucc.firstElementChild);
  }

  myDiagram.selection.each((node) => {
    if (node instanceof go.Node) {
      //Predecessor
      var it = node.findNodesInto().iterator;
      // rootLiPred = document.getElementById("predecessor");
      var ul = document.createElement("ul");
      ul.classList.add("menu");
      rootLiPred.appendChild(ul);
      while (it.next()) {
        var li = document.createElement("li");
        li.classList.add("menu-item");
        li.setAttribute("id", it.value.vb.key);
        li.innerText = it.value.vb.name;
        ul.appendChild(li);
      }
      //Successor
      var it = node.findNodesOutOf().iterator;
      // rootLiSucc = document.getElementById("successor");
      var ul = document.createElement("ul");
      ul.classList.add("menu");
      rootLiSucc.appendChild(ul);
      while (it.next()) {
        var li = document.createElement("li");
        li.classList.add("menu-item");
        li.setAttribute("id", it.value.vb.key);
        li.innerText = it.value.vb.name;
        ul.appendChild(li);
      }
    }
  });

  var menuItem = document.querySelectorAll(".menu-item");

  for (var i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("pointerdown", (event) =>
      goToPosition(event.target.id)
    );
  }

  var hasMenuItem = false;
  function maybeShowItem(elt, pred) {
    if (pred) {
      elt.style.display = "block";
      hasMenuItem = true;
    } else {
      elt.style.display = "none";
    }
  }
  maybeShowItem(document.getElementById("predecessor"), obj !== null);
  maybeShowItem(document.getElementById("successor"), obj !== null);

  // Now show the whole context menu element
  if (hasMenuItem) {
    cxElement.classList.add("show-menu");
    // we don't bother overriding positionContextMenu, we just do it here:
    var mousePt = diagram.lastInput.viewPoint;
    cxElement.style.left = mousePt.x + 5 + "px";
    cxElement.style.top = mousePt.y + "px";
  }

  // Optional: Use a `window` pointerdown listener with event capture to
  //           remove the context menu if the user clicks elsewhere on the page
  window.addEventListener("pointerdown", hideCX, true);
}

function hideContextMenu() {
  cxElement.classList.remove("show-menu");
  // Optional: Use a `window` pointerdown listener with event capture to
  //           remove the context menu if the user clicks elsewhere on the page
  window.removeEventListener("pointerdown", hideCX, true);
}

// A custom command, for select and highlight selected node(s).
function goToPosition(nodeId) {
  try {
    var diagram = myDiagram;
    node = diagram.findNodeForKey(nodeId);
    myDiagram.select(node);
    // try to center the diagram at the first node that was found
    myDiagram.centerRect(node.actualBounds);
    // remove any previous highlighting
    diagram.clearHighlighteds();
    // for each Node destination for the Node, set Node.isHighlighted
    node.findNodesOutOf().each(function (n) {
      n.isHighlighted = true;
    });
    node.findNodesInto().each(function (n) {
      n.isHighlighted = true;
    });
    for (let x in linksArray) {
      linksArray[x].elt(0).stroke = "#D3D3D3";
      linksArray[x].elt(0).strokeWidth = 2;
      myDiagram.model.set(linksArray[x], "zOrder", linksArray[x].zOrder - 1);
    }
    linksArray = [];
    if (node.findLinksOutOf().next() === true) {
      var it = node.findLinksOutOf().iterator;
      while (it.next()) {
        linksArray.push(it.value);
        it.value.elt(0).stroke = highlightedLinkColor;
        it.value.elt(0).strokeWidth = 4;
        myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
      }
    }
    if (node.findLinksInto().next() === true) {
      var it = node.findLinksInto().iterator;
      while (it.next()) {
        linksArray.push(it.value);
        it.value.elt(0).stroke = highlightedLinkColor;
        it.value.elt(0).strokeWidth = 4;
        myDiagram.model.set(it.value, "zOrder", it.value.zOrder + 1);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
