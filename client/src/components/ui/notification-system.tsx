import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X, Zap, Target, Trophy, Flame } from "lucide-react";
import { useState, useEffect } from "react";

export type NotificationType = "success" | "warning" | "info" | "achievement" | "streak" | "goal";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const notificationConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500"
  },
  warning: {
    icon: AlertCircle,
    bgColor: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500"
  },
  info: {
    icon: Info,
    bgColor: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500"
  },
  achievement: {
    icon: Trophy,
    bgColor: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500"
  },
  streak: {
    icon: Flame,
    bgColor: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-500"
  },
  goal: {
    icon: Target,
    bgColor: "from-primary/20 to-secondary/20",
    borderColor: "border-primary/30",
    iconColor: "text-primary"
  }
};

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification, index) => {
          const config = notificationConfig[notification.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1
              }}
              className={`
                relative glass-card p-4 ${config.borderColor} border
                bg-gradient-to-r ${config.bgColor}
                backdrop-blur-xl cursor-pointer group
              `}
              onMouseEnter={() => setHoveredId(notification.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => notification.action?.onClick()}
            >
              {/* Progress bar for auto-dismiss */}
              {notification.duration && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary/50 rounded-b-lg"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: notification.duration / 1000, ease: "linear" }}
                />
              )}

              <div className="flex items-start space-x-3">
                {/* Icon with pulse animation */}
                <motion.div
                  className={`
                    flex-shrink-0 w-8 h-8 rounded-full 
                    bg-current/10 flex items-center justify-center
                    ${config.iconColor}
                  `}
                  animate={{
                    scale: hoveredId === notification.id ? 1.1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-foreground truncate">
                      {notification.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(notification.id);
                      }}
                      className="flex-shrink-0 ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {/* Action button */}
                  {notification.action && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        notification.action!.onClick();
                      }}
                    >
                      {notification.action.label}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === notification.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }

    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
}