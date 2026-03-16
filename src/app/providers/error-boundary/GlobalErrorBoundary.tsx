import * as Sentry from '@sentry/react'
import { Card, Typography, Button } from 'antd'
import { Component, type ErrorInfo, type ReactNode } from 'react'

const { Title, Paragraph } = Typography

interface GlobalErrorBoundaryProps {
  children: ReactNode
}

interface GlobalErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  state: GlobalErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[GlobalErrorBoundary] Uncaught error:', error, info.componentStack)

    Sentry.captureException(error, {
      extra: {
        componentStack: info.componentStack,
      },
    })
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100svh',
            padding: 24,
            background: '#f0f2f5',
          }}
        >
          <Card
            style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}
            variant={'outlined'}
          >
            <Title level={3} style={{ marginBottom: 16 }}>
              Что-то пошло не так
            </Title>

            {this.state.error && (
              <Paragraph type="secondary" ellipsis={{ rows: 3, expandable: true }}>
                {this.state.error.message}
              </Paragraph>
            )}

            <Button type="primary" onClick={this.handleReset}>
              Попробовать снова
            </Button>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
