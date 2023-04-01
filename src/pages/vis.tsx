import React, { useRef, useEffect } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

interface Node {
    id: number;
    label: string;
    hidden: boolean
}

interface Edge {
    id: number;
    from: number;
    to: number;
    arrows?:string
}

const nodesData: Node[] = [
    { id: 1, label: 'Node 1', hidden: false },
    { id: 2, label: 'Node 2', hidden: false },
    { id: 3, label: 'Node 3', hidden: false },
];

const edgesData: Edge[] = [
    { id: 1, from: 1, to: 2, arrows: "to" },
    { id: 2, from: 1, to: 3 },
    { id: 3, from: 2, to: 3 },
];

function MyNetwork() {
    const containerRef = useRef<HTMLDivElement>(null);

    // console.log('nodesData', nodesData)

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const nodes = new DataSet<Node>(nodesData);
        const edges = new DataSet<Edge>(edgesData);

        const data = {
            nodes,
            edges,
        };

        const options = {
            nodes:{
                shape: 'box',
                color: {
                    border: '#2B7CE9',
                    background: '#fc9797',
                    highlight: {
                      border: '#2B7CE9',
                      background: '#D2E5FF'
                    },
                    hover: {
                      border: '#2B7CE9',
                      background: '#97c2fc'
                    }
                  },
            },
            interaction: {
                hover: true,
                hoverConnectedEdges: false,
                selectable: true
            }
        };

        const network = new Network(containerRef.current, data, options);

        network.on('selectNode', (params) => {
            // const nodeId = params.nodes[0]; // Get the ID of the clicked node
            // const childIds = network.getConnectedNodes(nodeId, 'to'); // Get the IDs of the node's children

            // // Toggle the hidden attribute for each child node
            // childIds.forEach((childId) => {
            //     const child = nodes.get(childId as string);

            //     if (child) {
            //         child.hidden = !child.hidden; // Toggle the hidden attribute
            //         nodes.update(child); // Update the dataset to reflect the change
            //     }
            // });
        })

        network.on('click', (params) => {
            if (params.nodes.length === 1) {
                const newNodeId = nodes.length + 1;
                const newNode: Node = {
                    id: newNodeId,
                    label: `Node ${newNodeId}`,
                    hidden: false
                };
                const newEdge: Edge = {
                    id: edges.length + 1,
                    from: params.nodes[0],
                    to: newNodeId,
                };
                nodes.add(newNode);
                edges.add(newEdge);
            }

        });

        // network.on('hoverNode', (params) => {
        //     // const nodeId = params.node;
        //     // const node = nodes.get(nodeId as string);
        //     // if (node) {
        //     //     node.label = `${node.label} (hovered)`;
        //     //     nodes.update(node);
        //     // }

        //     const nodeId = params.node; // Get the ID of the clicked node
        //     const childIds = network.getConnectedNodes(nodeId, 'to'); // Get the IDs of the node's children

        //     // Toggle the hidden attribute for each child node
        //     childIds.forEach((childId) => {
        //         const child = nodes.get(childId as string);

        //         if (child) {
        //             child.hidden = false; // Toggle the hidden attribute
        //             nodes.update(child); // Update the dataset to reflect the change
        //         }
        //     });
        // });

        // network.on('blurNode', (params) => {
        //     // const nodeId = params.node;
        //     // const node = nodes.get(nodeId as string);
        //     // if (node) {
        //     //     node.label = node.label.replace(' (hovered)', '');
        //     //     nodes.update(node);
        //     // }

            
        //     const nodeId = params.node; // Get the ID of the clicked node
        //     const childIds = network.getConnectedNodes(nodeId, 'to'); // Get the IDs of the node's children

        //     // Toggle the hidden attribute for each child node
        //     childIds.forEach((childId) => {
        //         const child = nodes.get(childId as string);

        //         if (child) {
        //             child.hidden = true; // Toggle the hidden attribute
        //             nodes.update(child); // Update the dataset to reflect the change
        //         }
        //     });
        // });
    }, []);

    return <div ref={containerRef} style={{ height: '400px' }} />;
}

export default MyNetwork;
