import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Target, Utensils, BarChart3, ChevronRight, Play, Users, Star, Zap, Crown, TrendingUp, Shield, Heart, Sparkles, Github, Linkedin, Mail, Code, Coffee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedAvatar } from "@/components/ui/animated-avatar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { SuccessStoryModal } from "@/components/ui/success-story-modal";
import { Chatbot } from "@/components/ui/chatbot";
import { useScrollAnimation, useCountUp, useTypewriter } from "@/hooks/use-scroll-animations";
import { useState } from "react";

export default function Landing() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -150]);
  
  const [showSuccessStory, setShowSuccessStory] = useState(false);
  
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialRef = useScrollAnimation();
  const founderRef = useScrollAnimation();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const userCount = useCountUp(15000, 2000, statsRef.isVisible);
  const successRate = useCountUp(94, 2000, statsRef.isVisible);
  const avgImprovement = useCountUp(68, 2000, statsRef.isVisible);
  
  const heroText = useTypewriter("Transform Your Fitness Journey", 100, true);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles count={80} className="fixed inset-0 z-0" />
      
      {/* Advanced gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pattern-dots" />
      
      {/* Header */}
      <header className="relative z-50 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
              <Activity className="relative h-10 w-10 text-primary drop-shadow-lg" />
            </div>
            <span className="text-3xl font-bold gradient-text">
              FitSync
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center space-x-4"
          >
            <Button variant="ghost" className="glass-button" onClick={scrollToFeatures}>
              Features
            </Button>
            <Link href="/signup">
              <Button className="btn-primary group">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-3 glass-card px-6 py-3 hover-glow"
            >
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-medium text-primary">Privacy-First • AI-Powered • Local Storage</span>
            </motion.div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-shadow">{heroText}</span>
                <br />
                <span className="gradient-text text-glow">
                  Like Never Before
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
              >
                Experience personalized Indian meal plans, adaptive workout routines, and intelligent progress tracking. 
                Your data remains completely private while you achieve extraordinary results.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button size="lg" className="btn-primary text-lg px-10 py-4 group relative overflow-hidden">
                  <span className="relative z-10">Start Your Transformation</span>
                  <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-4 glass-button hover-scale group"
                onClick={() => setShowSuccessStory(true)}
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Success Stories
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center space-x-8 pt-6"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {/* {[1, 2, 3, 4].map((i) => (
                    <AnimatedAvatar key={i} size="sm" type="user" className="border-2 border-background" />
                  ))} */}
                </div>
                <div>
                  <div className="text-sm font-semibold">15,000+ Active Users</div>
                  <div className="text-xs text-muted-foreground">Join the community</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="relative glass-card p-8 backdrop-blur-xl rounded-3xl">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              
              <div className="relative grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="interactive-card glass-card p-6 border-0"
                >
                  <Target className="h-10 w-10 text-primary mb-4 floating" />
                  <h3 className="font-bold mb-3 text-lg">Smart Goals</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">AI-powered goal setting with adaptive milestones</p>
                  <ProgressRing progress={85} size={60} className="mt-4" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="interactive-card glass-card p-6 border-0 mt-8"
                >
                  <Utensils className="h-10 w-10 text-green-500 mb-4 floating-delayed" />
                  <h3 className="font-bold mb-3 text-lg">Indian Cuisine</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Authentic meal plans with traditional flavors</p>
                  <div className="mt-4 flex space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="interactive-card glass-card p-6 border-0 -mt-4"
                >
                  <Activity className="h-10 w-10 text-blue-500 mb-4 floating-slow" />
                  <h3 className="font-bold mb-3 text-lg">Adaptive Workouts</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Home, gym, or yoga - personalized for you</p>
                  <div className="mt-4">
                    <div className="progress-modern h-2 rounded-full w-full" />
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="interactive-card glass-card p-6 border-0 mt-4"
                >
                  <BarChart3 className="h-10 w-10 text-purple-500 mb-4 floating" />
                  <h3 className="font-bold mb-3 text-lg">Live Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Real-time insights and progress tracking</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+24% this week</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            ref={featuresRef.ref}
            className={`scroll-reveal ${featuresRef.isVisible ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">Why Choose FitSync?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of cutting-edge technology and personalized fitness guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data never leaves your device. Complete control and security.",
                color: "text-green-500"
              },
              {
                icon: Crown,
                title: "Premium Experience",
                description: "Professional-grade features with an intuitive, beautiful interface.",
                color: "text-purple-500"
              },
              {
                icon: Heart,
                title: "Holistic Wellness",
                description: "Mind, body, and nutrition - comprehensive health transformation.",
                color: "text-red-500"
              }
            ].map((feature, index) => {
              const animation = useScrollAnimation();
              return (
                <motion.div
                  key={feature.title}
                  ref={animation.ref}
                  className={`scroll-reveal ${animation.isVisible ? 'visible' : ''} text-center`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="interactive-card glass-card p-8 h-full">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 ${feature.color} bg-current/10 rounded-full flex items-center justify-center mx-auto pulse-glow`}>
                        <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            ref={statsRef.ref}
            className={`scroll-reveal ${statsRef.isVisible ? 'visible' : ''}`}
          >
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl font-bold gradient-text">{userCount.toLocaleString()}+</div>
                <div className="text-xl font-semibold">Active Users</div>
                <div className="text-muted-foreground">Growing daily</div>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-bold gradient-text">{successRate}%</div>
                <div className="text-xl font-semibold">Success Rate</div>
                <div className="text-muted-foreground">Achieve their goals</div>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-bold gradient-text">{avgImprovement}%</div>
                <div className="text-xl font-semibold">Avg Improvement</div>
                <div className="text-muted-foreground">In fitness metrics</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            ref={founderRef.ref}
            className={`scroll-reveal ${founderRef.isVisible ? 'visible' : ''}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold gradient-text mb-6">Meet the Founder</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built with passion for privacy, health, and authentic Indian culture
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Founder Photo & Info */}
                <motion.div
                  className="text-center lg:text-left space-y-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: founderRef.isVisible ? 1 : 0, x: founderRef.isVisible ? 0 : -50 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="relative mx-auto lg:mx-0 w-48 h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
                    <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center glass-card border-4 border-white/20">
                      <div className="text-6xl">👨‍💻</div>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">Nishant Singh</h3>
                    <p className="text-xl text-primary font-semibold">Founder & Lead Developer</p>
                    
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>India</span>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
                      <motion.a
                        href="https://www.linkedin.com/in/nishant-singh-10a3b6195/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg hover-scale"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <span>LinkedIn</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://github.com/nsingh347"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg hover-scale"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </motion.a>
                      
                      <motion.a
                        href="mailto:nsingh347@gmail.com"
                        className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg hover-scale"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-5 h-5 text-red-500" />
                        <span>Email</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>

                {/* Founder Story */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: founderRef.isVisible ? 1 : 0, x: founderRef.isVisible ? 0 : 50 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="glass-card p-8">
                    <blockquote className="text-lg italic mb-6 border-l-4 border-primary pl-6">
                      "I created FitSync because I believe everyone deserves access to personalized, culturally-relevant fitness guidance without compromising their privacy."
                    </blockquote>
                    
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        As a software engineer passionate about health and privacy, I noticed a gap in the fitness app market. 
                        Most apps either ignored Indian dietary preferences or compromised user privacy by storing personal data in the cloud.
                      </p>
                      
                      <p>
                        FitSync was born from the idea that fitness should be personal, private, and culturally authentic. 
                        Every line of code is written with respect for your data and your heritage.
                      </p>
                      
                      <p>
                        The local-first architecture ensures your fitness journey remains completely private, 
                        while the AI-powered Indian meal plans honor our rich culinary traditions.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/50">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Code className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold">5+ Years</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Development Experience</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Coffee className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold">Privacy First</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Core Philosophy</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community & Support Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Join Our Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with fellow fitness enthusiasts and get the support you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="interactive-card glass-card p-8 text-center"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Growing Community</h3>
              <p className="text-muted-foreground mb-4">15,000+ active users sharing their fitness journeys</p>
              <Button variant="ghost" className="glass-button">Join Discussion</Button>
            </motion.div>

            <motion.div
              className="interactive-card glass-card p-8 text-center"
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-muted-foreground mb-4">Get guidance from certified nutritionists and trainers</p>
              <Button variant="ghost" className="glass-button">Get Help</Button>
            </motion.div>

            <motion.div
              className="interactive-card glass-card p-8 text-center"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Regular Updates</h3>
              <p className="text-muted-foreground mb-4">New features, meal plans, and workout routines monthly</p>
              <Button variant="ghost" className="glass-button">Stay Updated</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            ref={testimonialRef.ref}
            className={`scroll-reveal ${testimonialRef.isVisible ? 'visible' : ''} space-y-8`}
          >
            <h2 className="text-5xl font-bold gradient-text">Ready to Transform?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands who have already discovered their best selves with FitSync
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/signup">
                <Button size="lg" className="btn-primary text-xl px-12 py-6">
                  Start Free Today
                  <Sparkles className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Story Modal */}
      <SuccessStoryModal 
        isOpen={showSuccessStory} 
        onClose={() => setShowSuccessStory(false)} 
      />

      {/* Chatbot Support */}
      <Chatbot />
    </div>
  );
}