import { Position, Handle, type NodeProps, type NodeTypes } from 'reactflow';
import {
  SparklesIcon, GlobeIcon, RobotIcon, PackageIcon,
  ChatIcon, BoltIcon, ClockIcon, SendIcon,
  WebhookIcon, SearchIcon, CartIcon, CreditCardIcon,
  GitBranchIcon, LinkIcon, BarChartIcon, ShoppingBagIcon,
} from '@/components/icons';

const iconMap: Record<string, React.ReactNode> = {
  chat: <ChatIcon />,
  sparkles: <SparklesIcon />,
  bolt: <BoltIcon />,
  send: <SendIcon />,
  robot: <RobotIcon />,
  git: <GitBranchIcon />,
  cart: <CartIcon />,
  credit: <CreditCardIcon />,
  search: <SearchIcon />,
  webhook: <WebhookIcon />,
  clock: <ClockIcon />,
  package: <PackageIcon />,
  globe: <GlobeIcon />,
  link: <LinkIcon />,
  bar: <BarChartIcon />,
  bag: <ShoppingBagIcon />,
};

const typeColors: Record<string, string> = {
  trigger: '#2e8b6e',
  ai: '#5a7fd4',
  action: '#1a1916',
  condition: '#d4845a',
};

function MpNode({ data }: NodeProps) {
  const color = typeColors[data.nodeType] || '#1a1916';
  return (
    <div className="mp-flow-node" style={{ borderColor: color }}>
      <Handle type="target" position={Position.Left} style={{ background: color, width: 6, height: 6, border: 'none' }} />
      <div className="mp-flow-node-icon" style={{ color }}>
        {iconMap[data.icon] || <BoltIcon />}
      </div>
      <span className="mp-flow-node-label">{data.label}</span>
      <Handle type="source" position={Position.Right} style={{ background: color, width: 6, height: 6, border: 'none' }} />
    </div>
  );
}

export const mpNodeTypes: NodeTypes = { mpNode: MpNode };
