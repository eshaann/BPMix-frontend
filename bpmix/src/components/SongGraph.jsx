import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';

export default function SongGraph({ songs }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const spacing = Math.max(500, 1000 / songs.length);
    const nodes = new DataSet(
      songs.map((song, i) => {
        const artworkSrc = song.artwork
          ? `data:image/png;base64,${song.artwork}`
          : '/default.png';

        const label = `${song.title}\nArtist: ${song.artist || 'Unknown'}\nKey: ${song.key}\nBPM: ${song.bpm}`;

        return {
          id: i,
          shape: 'image',
          image: artworkSrc,
          label,
          font: {
            size: 14,
            face: 'monospace',
            align: 'top',
            multi: true,
            color: '#ffffff',
          },
          margin: 12,
          size: 40,
          x: i * spacing,
          y: 0,
          borderWidth: 0,
        };
      })
    );

    const edges = new DataSet(
      songs.slice(1).map((_, i) => ({
        from: i,
        to: i + 1,
        arrows: {
          to: {
            enabled: true,
            type: 'arrow',
          },
        },
        color: {
          color: '#888',
          highlight: '#fff',
          hover: '#fff',
        },
        width: 2,
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          roundness: 0.4,
        },
      }))
    );

    const data = { nodes, edges };

    const options = {
      layout: {
        improvedLayout: false,
      },
      physics: {
        enabled: false,
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        hover: true,
        tooltipDelay: 0,
        dragEdges: true,
        multiselect: false,
        selectable: true,
        selectConnectedEdges: true,
      },
      manipulation: {
        enabled: true,
        addEdge: (data, callback) => {
          if (data.from === data.to) {
            alert("Cannot connect node to itself");
            return;
          }
          callback(data);
        },
        editEdge: (data, callback) => {
          if (data.from === data.to) {
            alert("Cannot connect node to itself");
            return;
          }
          callback(data);
        },
        deleteEdge: true,
      },
      nodes: {
        shapeProperties: {
          useImageSize: false,
        },
        borderWidth: 0,
        font: {
          size: 14,
          face: 'monospace',
          align: 'top',
          multi: true,
          color: '#ffffff',
        },
      },
      edges: {
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          roundness: 0.4,
        },
        arrows: {
          to: {
            enabled: true,
            type: 'arrow',
          },
        },
        color: {
          color: '#888',
          highlight: '#fff',
          hover: '#fff',
        },
        width: 2,
      },
    };

    if (networkRef.current) {
      networkRef.current.destroy();
    }
    networkRef.current = new Network(containerRef.current, data, options);

  }, [songs]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #111',
        backgroundColor: '#000',
      }}
    />
  );
}
