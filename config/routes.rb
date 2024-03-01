Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'admin/index'
  get 'admin/appearance'
  get 'admin/analytics'
  get 'admin/settings'
  patch 'admin/update', to: 'admin#update', as: :admin_update


  get '/:slug', to: 'profiles#show', as: :user

  resources :links, only: %i[create update destroy] do
    patch 'toggle_active', on: :member
  end

  patch '/link_position/:id', to: 'links#update_position', as: :link_position


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "admin#index"
end
