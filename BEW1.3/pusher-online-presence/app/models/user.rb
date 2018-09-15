class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :username, presence: :true, uniqueness: { case_sensitive: false }
  validates :is_signed_in, inclusion: [true, false]
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  after_create :notify_pusher # add this line

  def notify_pusher # add this method
    Pusher.trigger('activity', 'login', self.as_json)
  end

  def as_json(options={}) # add this method
    super(
      only: [:id, :email, :username]
    )
  end
end
