"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Collection",
      message: "Check out our latest summer collection!",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Sale Alert",
      message: "50% off on all hoodies this weekend!",
      time: "Yesterday",
      read: false,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <>
      <motion.button
        className="fixed right-6 top-44 z-40 p-3 rounded-full bg-dark-800 shadow-lg hover:bg-dark-700 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Bell className="h-6 w-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-800 shadow-xl z-50"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-dark-600 px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-blue-500" />
                    Notifications
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button className="text-sm text-blue-400 hover:text-blue-300" onClick={markAllAsRead}>
                      Mark all as read
                    </button>
                    <button onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Notifications list */}
                <div className="flex-1 overflow-auto py-4">
                  {notifications.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center">
                      <Bell className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-400">No notifications</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-dark-600 px-6">
                      {notifications.map((notification) => (
                        <motion.li
                          key={notification.id}
                          className={`py-4 ${notification.read ? "opacity-60" : ""}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-2 h-2 mt-2 rounded-full ${notification.read ? "bg-gray-500" : "bg-blue-500"}`}
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

