import type { Order } from './orders-data';
import { statusConfig, paymentConfig } from './orders-data';
import {
  WhatsAppIcon, InstagramIcon, GlobeIcon, MailIcon, GearIcon,
} from '@/components/icons';

const channelIcons: Record<string, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon />,
  Instagram: <InstagramIcon />,
  'Web Chat': <GlobeIcon />,
  Email: <MailIcon />,
  API: <GearIcon />,
};

interface OrderRowProps {
  order: Order;
  onView: (order: Order) => void;
}

export default function OrderRow({ order, onView }: OrderRowProps) {
  const sc = statusConfig[order.status];
  const pc = paymentConfig[order.paymentStatus];

  return (
    <tr className="order-row" onClick={() => onView(order)}>
      <td>
        <span className="order-id">{order.id}</span>
      </td>
      <td>
        <div className="order-customer">
          <div className="order-avatar">{order.initials}</div>
          <span>{order.customer}</span>
        </div>
      </td>
      <td>
        <div className="order-channel">
          <span className="order-channel-icon">{channelIcons[order.channel]}</span>
          {order.channel}
        </div>
      </td>
      <td className="order-total">{order.total}</td>
      <td><span className={`chip ${sc.className}`}><span className="chip-dot" />{sc.label}</span></td>
      <td><span className={`chip ${pc.className}`}><span className="chip-dot" />{pc.label}</span></td>
      <td className="order-date">{order.date}</td>
    </tr>
  );
}
