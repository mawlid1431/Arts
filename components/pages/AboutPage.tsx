import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Palette, Users, Award, Globe, Truck } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Palette, label: 'Artworks Sold', value: '25,000+' },
    { icon: Globe, label: 'Countries Served', value: '50+' },
    { icon: Award, label: 'Years of Excellence', value: '8+' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'We believe art has the power to transform spaces and inspire lives. Every piece we curate is selected with love and care.'
    },
    {
      icon: Palette,
      title: 'Quality First',
      description: 'We work only with talented artists and ensure every artwork meets our high standards for quality and authenticity.'
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We provide personalized service and support throughout your art buying journey.'
    },
    {
      icon: Truck,
      title: 'Worldwide Reach',
      description: 'We ship beautiful art to customers around the globe, carefully packaging each piece for safe delivery.'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Nujuum Arts
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about making exceptional art accessible to everyone. 
            Our curated collection brings together talented artists from around the world 
            to help you transform your space into something truly amazing.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <Card className="p-8 md:p-12">
              <CardContent className="p-0">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  "To democratize access to exceptional art by connecting passionate artists with art lovers worldwide, 
                  creating meaningful experiences that inspire and transform living spaces into personal galleries of beauty and expression."
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nujuum Arts was born from a simple belief: everyone deserves to live surrounded by beauty. 
                  Founded in 2016 by a group of art enthusiasts and former gallery owners, we set out to break down 
                  the barriers between exceptional art and everyday people.
                </p>
                <p>
                  We noticed that while there was incredible talent in the art world, many people felt intimidated 
                  by traditional galleries or couldn't access the pieces they loved. We wanted to change that by 
                  creating a platform that celebrates both emerging and established artists while making art 
                  collection approachable and enjoyable.
                </p>
                <p>
                  Today, we're proud to work with over 500 artists from 40 countries, having delivered more than 
                  25,000 pieces to art lovers worldwide. But our story is just beginning – we're constantly discovering 
                  new talent and expanding our collection to bring you the most exciting contemporary art.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Palette className="h-20 w-20 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-primary">
                  Making Art Accessible Since 2016
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from curating art to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Behind every great art collection is a passionate team dedicated to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Founder & Curator',
                bio: 'Former gallery director with 15 years of experience in contemporary art curation.',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b69ee765?w=400&h=400&fit=crop&crop=face'
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Artist Relations',
                bio: 'Passionate about discovering emerging talent and fostering long-term artist partnerships.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
              },
              {
                name: 'Emma Thompson',
                role: 'Customer Experience',
                bio: 'Dedicated to ensuring every customer finds the perfect piece for their space.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Art Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of art lovers who have already transformed their spaces with our curated collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => onNavigate('shop')}>
                  Explore Collection
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('contact')}>
                  Get in Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}