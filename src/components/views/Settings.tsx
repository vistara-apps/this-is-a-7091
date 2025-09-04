import React from 'react';
import { Crown, Check } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export const Settings: React.FC = () => {
  const { tier, setTier } = useSubscription();

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 3 projects',
        'Basic dashboard',
        'Live metrics',
        'Community support'
      ],
      limitations: [
        'No historical data',
        'No advanced analytics',
        'Limited to 3 projects'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$10',
      period: 'month',
      features: [
        'Unlimited projects',
        'Historical data access',
        'Advanced analytics',
        'Email support',
        'Export data'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$25',
      period: 'month',
      features: [
        'Everything in Pro',
        'Creator attribution insights',
        'Priority support',
        'Custom reports',
        'API access'
      ]
    }
  ];

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-text-primary">Settings</h2>
        <p className="text-text-secondary mt-1">Manage your account and subscription</p>
      </div>

      {/* Current Plan */}
      <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-md">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className={`w-6 h-6 mr-2 ${
              tier === 'premium' ? 'text-yellow-500' : 
              tier === 'pro' ? 'text-primary' : 
              'text-text-secondary'
            }`} />
            <div>
              <p className="font-semibold text-text-primary capitalize">{tier}</p>
              <p className="text-sm text-text-secondary">
                {tier === 'free' ? 'Free forever' : `$${tier === 'pro' ? '10' : '25'}/month`}
              </p>
            </div>
          </div>
          {tier !== 'premium' && (
            <button className="px-md py-sm bg-primary hover:bg-primary/90 text-white rounded-button font-medium transition-colors">
              Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-lg">Subscription Plans</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-surface/50 backdrop-blur-sm border rounded-card p-lg ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/20' 
                  : 'border-surface/50'
              } ${
                tier === plan.id 
                  ? 'ring-2 ring-accent' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-lg">
                <h4 className="text-xl font-semibold text-text-primary">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-sm mb-lg">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations && (
                <div className="mb-lg">
                  <p className="text-xs text-text-secondary/70 mb-2">Limitations:</p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="text-xs text-text-secondary/70">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setTier(plan.id as any)}
                disabled={tier === plan.id}
                className={`w-full py-sm rounded-button font-medium transition-colors ${
                  tier === plan.id
                    ? 'bg-accent/20 text-accent border border-accent/30 cursor-default'
                    : plan.id === 'free'
                    ? 'bg-surface hover:bg-surface/70 text-text-primary border border-surface/50'
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
              >
                {tier === plan.id ? 'Current Plan' : plan.id === 'free' ? 'Downgrade' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-lg">Account Settings</h3>
        <div className="space-y-lg">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value="creator@example.com"
              className="w-full px-md py-sm bg-background border border-surface/50 rounded-input text-text-primary focus:outline-none focus:border-primary"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Notifications
            </label>
            <div className="space-y-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-text-secondary text-sm">Email notifications for earnings updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-text-secondary text-sm">Weekly performance reports</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-text-secondary text-sm">Marketing updates</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};