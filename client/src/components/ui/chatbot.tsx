import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const botResponses = {
  greeting: [
    "Hi! I'm here to help you with FitSync. What can I assist you with today?",
    "Hello! Welcome to FitSync support. How can I help you on your fitness journey?",
    "Hey there! I'm your FitSync assistant. What questions do you have?"
  ],
  features: [
    "FitSync offers personalized Indian meal plans, adaptive workout routines (home/gym/yoga), progress tracking, and achievement systems - all stored locally for complete privacy!",
    "Our key features include AI-powered meal planning with authentic Indian cuisine, customizable workouts based on your preferences, real-time progress tracking, and gamification elements to keep you motivated!"
  ],
  privacy: [
    "Your privacy is our top priority! All your data stays on your device - we never store or access your personal information on our servers.",
    "FitSync is completely local-first. Your fitness data, meal plans, and progress never leave your browser. You have complete control and ownership of your information."
  ],
  workouts: [
    "We offer three workout types: Home workouts (no equipment needed), Gym workouts (with equipment), and Yoga sessions. Each is customized based on your fitness level and goals!",
    "Our workout plans adapt to your preferences - whether you prefer working out at home, hitting the gym, or practicing yoga. All exercises include calorie tracking and progress monitoring."
  ],
  meals: [
    "Our meal plans feature authentic Indian cuisine with traditional flavors, customized for your goals (weight loss, gain, or maintenance) and activity level.",
    "We create personalized Indian meal plans that respect your cultural preferences while helping you achieve your fitness goals. From breakfast parathas to dinner dal - we've got you covered!"
  ],
  pricing: [
    "FitSync is completely free to use! No subscriptions, no hidden fees. Just download and start your fitness journey.",
    "Great news - FitSync is 100% free! We believe everyone deserves access to quality fitness guidance without financial barriers."
  ],
  support: [
    "For technical issues or feedback, you can reach our founder Nishant Singh directly at nsingh347@gmail.com or connect on LinkedIn.",
    "Need help? Contact our team at nsingh347@gmail.com or check out our GitHub repository for updates and documentation."
  ],
  default: [
    "I'm here to help! You can ask me about FitSync features, privacy, workouts, meal plans, or technical support.",
    "That's a great question! Feel free to ask about our workout types, meal planning, privacy features, or how to get started with FitSync.",
    "I'd be happy to help you with that! Try asking about specific features, how FitSync works, or any concerns you might have."
  ]
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return getRandomResponse(botResponses.greeting);
  } else if (message.includes('feature') || message.includes('what') || message.includes('how')) {
    return getRandomResponse(botResponses.features);
  } else if (message.includes('privacy') || message.includes('data') || message.includes('safe')) {
    return getRandomResponse(botResponses.privacy);
  } else if (message.includes('workout') || message.includes('exercise') || message.includes('gym')) {
    return getRandomResponse(botResponses.workouts);
  } else if (message.includes('meal') || message.includes('food') || message.includes('indian')) {
    return getRandomResponse(botResponses.meals);
  } else if (message.includes('price') || message.includes('cost') || message.includes('free')) {
    return getRandomResponse(botResponses.pricing);
  } else if (message.includes('help') || message.includes('support') || message.includes('contact')) {
    return getRandomResponse(botResponses.support);
  } else {
    return getRandomResponse(botResponses.default);
  }
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      message: "Hi! I'm your FitSync assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      message: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: getBotResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full btn-primary shadow-lg hover-scale group"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Pulse indicator */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-card border-0 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">FitSync Support</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="glass-button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary/20' 
                        : 'bg-secondary/20'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/10 text-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="glass-input flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="btn-primary"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}