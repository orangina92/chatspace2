class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :group_id, :user_id, presence: true, numericality: {only_integer: true}
  validates :body_or_image, presence: true
  mount_uploader :image, Message::ImageUploader
  private

  def body_or_image
    body.presence or image.presence
  end


end


