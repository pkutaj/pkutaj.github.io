## overview
The concern is to illustrate the basics of the concept of DAG (directed acyclic graph) foundational for any _distributed_ version control system (i.e. git)

## toc
<!-- TOC -->

- [1. graph](#1-graph)
- [2. directed graph](#2-directed-graph)
- [3. acyclic directed graph](#3-acyclic-directed-graph)
- [4. types of nodes in git](#4-types-of-nodes-in-git)
- [5. links](#5-links)

<!-- /TOC -->

### 1. graph
* graphs consist of
    * **nodes**
    * **edges** lines joining those nodes together

![nodes_and_edges]({{ site.url }}/assets/img000986.png)

* there are more common types of graphs such as trees (hierarchical graphs) or lists (with nodes having up to 2 pointers)

### 2. directed graph
* in a directed graph, edges have a defined direction
* this is because there is a **parent-child** relationship going on here

![parent_child_in_directed_graph]({{ site.url }}/assets/img000987.png)

### 3. acyclic directed graph
* means that if you follow the direction, you **can't get to where you started**
* it is not a tree in that a node can have > 1 parent (the merge node see the merge node)

![acyclic_graph]({{ site.url }}/assets/img000988.png)

* DAGs can get complex pretty quickly

![more_complex_dag]({{ site.url }}/assets/img000990.png)

### 4. types of nodes in git

![4_nodes_in_DAG]({{ site.url }}/assets/img000991.png)

### 5. links
* [Understanding Distributed Version Control Systems](https://app.pluralsight.com/library/courses/understanding-distributed-version-control-systems/table-of-contents)
* [Tech Talk: Linus Torvalds on git - YouTube](https://www.youtube.com/watch?v=4XpnKHJAok8)
