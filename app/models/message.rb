class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :group_id, :user_id, presence: true, numericality: {only_integer: true}
  validates_presence_of :content, :unless => :image?
  validates_presence_of :image, :unless => :content?
  mount_uploader :image, Message::ImageUploader

end


