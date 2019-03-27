# lab2learn Network Science

Lab tutorial for experiments in Network Science.

# Gephi Lab

Download the latest version of [Gephi](https://gephi.org/).

The latest version used in this lab is: [Gephi for Linux 0.9.2](https://github.com/gephi/gephi/releases/download/v0.9.2/gephi-0.9.2-linux.tar.gz).

# Experiments

## PageRank

The `pagerank` directory has examples of the centrality algorithm PageRank.

In the first example, you are invited to produce a Comma Separated Value (CSV) departing from the following graph:
![Original Graph](pagerank/pagerank-simple-original.png).

The produced file is like the following: [pagerank-simple.cvs](pagerank/pagerank-simple.csv). It is the starting point.

The file is imported in the `Data Laboratory` tab, then the `[PageRank]` module in the `Statistics` tab computes the PageRank centrality. The centrality values are then related to the sizes of the nodes in the `[Appearance]` tab.

## Community

The following example (inside the `community` directory) shows how Gephi can compute communities in a simples graph.

The graph is produced starting from the following CSV file: [community-simple.csv](community/community-simple.csv).

Using the `[Modularity]` module in the `Statistics` tab, the modules or communities are computed inside the graph. The communities are then related to the colors of the nodes in the `[Appearance]` tab.

The resulting graph can be seen in the illustration below. The resulting Gephi file can be downloaded at: [community.gephi](community/community-simple.gephi).

![Simple Community](community/community-simple.png)
