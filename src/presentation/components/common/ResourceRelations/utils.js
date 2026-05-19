import { getBorderColor } from '../../../utils/theme.js';

export function getResourceHealth(resource) {
  if (!resource) return 'none';
  const conditions = Array.isArray(resource.conditions)
    ? resource.conditions
    : Array.isArray(resource.status?.conditions)
      ? resource.status.conditions
      : [];
  if (conditions.length === 0) return 'none';
  const normalizedStatuses = conditions
    .map((c) => c?.status)
    .map((status) => {
      if (typeof status === 'string') {
        const normalized = status.toLowerCase();
        if (normalized === 'true') return 'true';
        if (normalized === 'false') return 'false';
      }
      if (status === true) return 'true';
      if (status === false) return 'false';
      return 'unknown';
    });
  const hasFalse = normalizedStatuses.some((s) => s === 'false');
  const hasUnknown = normalizedStatuses.some((s) => s === 'unknown');
  const allTrue = normalizedStatuses.every((s) => s === 'true');
  if (allTrue) return 'healthy';
  if (hasFalse) return 'unhealthy';
  if (hasUnknown) return 'warning';
  return 'warning';
}

export function getHealthColor(health) {
  if (health === 'healthy') return '#38A169';
  if (health === 'unhealthy') return '#E53E3E';
  return '#DD6B20';
}

export function getNodeBorderColor(health, colorMode) {
  if (health === 'none') {
    return getBorderColor(colorMode, 'gray');
  }
  return getHealthColor(health);
}
