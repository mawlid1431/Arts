'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error Boundary caught an error:', error, errorInfo);
    
    // In production, you could send this to an error reporting service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // reportError(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Oops! Something went wrong
                </h2>
                <p className="text-muted-foreground">
                  We're sorry, but something unexpected happened. Our team has been notified.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left mt-4 p-4 bg-muted rounded-lg text-sm">
                    <summary className="font-medium cursor-pointer">Error Details (Development)</summary>
                    <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
                      {this.state.error.toString()}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={this.handleHome}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
              
              <Button 
                onClick={this.handleReload}
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Reload Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specific error boundary for API-related errors
export const APIErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={
      <div className="p-6 text-center">
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
        <p className="text-muted-foreground mb-4">
          Unable to load data. Please check your connection and try again.
        </p>
        <Button onClick={() => window.location.reload()} size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

// Loading component for better UX
export const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
    <p className="text-muted-foreground">{message}</p>
  </div>
);