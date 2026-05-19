import { Box, Text } from '@chakra-ui/react';
import { useMemo, useEffect } from 'react';
import { getResourceHealth, getHealthColor, getNodeBorderColor } from './ResourceRelations/utils.js';
import { Legend } from './ResourceRelations/Legend.jsx';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { colors, getBackgroundColor, getBorderColor, getTextColor } from '../../utils/theme.js';
import FloatingEdge from './floatingReactFlow/FloatingEdge.jsx';

const edgeTypes = {
  floating: FloatingEdge,
};

export const ResourceRelations = ({ resource, relatedResources, colorMode, onNavigate }) => {
  const initialNodes = useMemo(() => {
    if (!resource) return [];

    const mainHealth = getResourceHealth(resource);

    const mainNode = {
      id: 'main-resource',
      type: 'default',
      position: { x: 400, y: 300 },
      data: {
        label: (
          <Box textAlign="center" p={2}>
            <Text fontWeight="bold" fontSize="sm" color={getTextColor(colorMode, 'primary')}>
              {resource.kind || 'Resource'}
            </Text>

            <Text fontSize="xs" color={getTextColor(colorMode, 'secondary')} mt={1}>
              {resource.name}
            </Text>

            {resource.namespace && resource.namespace !== 'default' && (
              <Text fontSize="xs" color={getTextColor(colorMode, 'muted')} mt={1}>
                ns: {resource.namespace}
              </Text>
            )}
          </Box>
        ),
      },
      style: {
        background: getBackgroundColor(colorMode, 'primary'),
        border: `2px solid ${getNodeBorderColor(mainHealth, colorMode)}`,
        borderRadius: '8px',
        padding: 0,
        minWidth: '150px',
        boxSizing: 'border-box',
      },
    };

    const relatedNodes = (relatedResources || []).map((related, index) => {
      const angle = (index * 2 * Math.PI) / Math.max(relatedResources.length, 1);
      const radius = Math.max(250, relatedResources.length * 30);

      const x = 400 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);

      const health = getResourceHealth(related);

      return {
        id: `related-${index}`,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <Box textAlign="center" p={2}>
              <Text
                fontWeight="semibold"
                fontSize="xs"
                color={getTextColor(colorMode, 'primary')}
              >
                {related.type || related.kind}
              </Text>

              <Text
                fontSize="xs"
                color={getTextColor(colorMode, 'secondary')}
                mt={1}
                maxW="120px"
                noOfLines={1}
              >
                {related.name}
              </Text>

              {related.namespace && related.namespace !== 'default' && (
                <Text fontSize="xs" color={getTextColor(colorMode, 'muted')} mt={1}>
                  ns: {related.namespace}
                </Text>
              )}
            </Box>
          ),
        },
        style: {
          background: getBackgroundColor(colorMode, 'secondary'),
          border: `2px solid ${getNodeBorderColor(health, colorMode)}`,
          borderRadius: '8px',
          padding: 0,
          minWidth: '120px',
          boxSizing: 'border-box',
        },
      };
    });

    return [mainNode, ...relatedNodes];
  }, [resource, relatedResources, colorMode]);

  const initialEdges = useMemo(() => {
    if (!resource) return [];

    return initialNodes
      .filter((n) => n.id !== 'main-resource')
      .map((node, index) => ({
        id: `edge-${index}`,
        source: 'main-resource',
        target: node.id,
        type: 'floating',
        markerEnd: { type: MarkerType.Arrow },
        style: {
          stroke:
            colorMode === 'dark'
              ? colors.border.dark.gray
              : colors.border.light.gray,
        },
      }));
  }, [initialNodes, resource, colorMode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const isMain = node.id === 'main-resource';

        if (isMain) {
          const health = getResourceHealth(resource);

          return {
            ...node,
            style: {
              ...node.style,
              background: getBackgroundColor(colorMode, 'primary'),
              border: `2px solid ${getNodeBorderColor(health, colorMode)}`,
            },
            data: {
              ...node.data,
              label: (
                <Box textAlign="center" p={2}>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color={getTextColor(colorMode, 'primary')}
                  >
                    {resource?.kind || 'Resource'}
                  </Text>

                  <Text
                    fontSize="xs"
                    color={getTextColor(colorMode, 'secondary')}
                    mt={1}
                  >
                    {resource?.name}
                  </Text>

                  {resource?.namespace &&
                    resource.namespace !== 'default' && (
                      <Text
                        fontSize="xs"
                        color={getTextColor(colorMode, 'muted')}
                        mt={1}
                      >
                        ns: {resource.namespace}
                      </Text>
                    )}
                </Box>
              ),
            },
          };
        }

        const index = parseInt(node.id.split('-')[1], 10);
        const related = relatedResources?.[index];

        if (!related) return node;

        const health = getResourceHealth(related);

        return {
          ...node,
          style: {
            ...node.style,
            background: getBackgroundColor(colorMode, 'secondary'),
            border: `2px solid ${getNodeBorderColor(health, colorMode)}`,
          },
          data: {
            ...node.data,
            label: (
              <Box textAlign="center" p={2}>
                <Text
                  fontWeight="semibold"
                  fontSize="xs"
                  color={getTextColor(colorMode, 'primary')}
                >
                  {related.type || related.kind}
                </Text>

                <Text
                  fontSize="xs"
                  color={getTextColor(colorMode, 'secondary')}
                  mt={1}
                  maxW="120px"
                  noOfLines={1}
                >
                  {related.name}
                </Text>

                {related.namespace &&
                  related.namespace !== 'default' && (
                    <Text
                      fontSize="xs"
                      color={getTextColor(colorMode, 'muted')}
                      mt={1}
                    >
                      ns: {related.namespace}
                    </Text>
                  )}
              </Box>
            ),
          },
        };
      })
    );
  }, [colorMode, resource, relatedResources, setNodes]);

  const handleNodeClick = (_event, node) => {
    if (!onNavigate || node.id === 'main-resource') {
      return false;
    }

    const index = parseInt(node.id.split('-')[1], 10);
    const related = relatedResources?.[index];

    if (!related?.apiVersion || !related?.kind || !related?.name) {
      return false;
    }

    const namespace = related.namespace && related.namespace !== 'undefined' && related.namespace !== 'null'
      ? related.namespace
      : null;

    onNavigate({
      apiVersion: related.apiVersion,
      kind: related.kind,
      name: related.name,
      namespace,
      plural: related.plural || null,
    });
    return true;
  };

  return (
    <Box
      minH="600px"
      h="700px"
      w="100%"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      {nodes.length > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          edgeTypes={edgeTypes}
          nodesDraggable
          nodesConnectable={false}
          connectOnClick={false}
          elementsSelectable={false}
          defaultEdgeOptions={{
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color={
              colorMode === 'dark'
                ? colors.border.dark.gray
                : colors.border.light.gray
            }
          />
        </ReactFlow>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" h="100%">
          <Text color={getTextColor(colorMode, 'secondary')}>
            No related resources found
          </Text>
        </Box>
      )}
      <Legend colorMode={colorMode} />
    </Box>
  );
};