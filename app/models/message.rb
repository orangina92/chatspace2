class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :group_id, :user_id, presence: true, numericality: {only_integer: true}
  validates :content_or_image, presence: true
  mount_uploader :image, Message::ImageUploader
  private

  def content_or_image
    content.presence or image.presence
  end


end


