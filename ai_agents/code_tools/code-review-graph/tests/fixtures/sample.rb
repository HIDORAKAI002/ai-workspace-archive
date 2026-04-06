require 'json'

module Auth
  class User
    attr_accessor :id, :name, :email

    def initialize(id, name, email)
      @id = id
      @name = name
      @email = email
    end

    def to_s
      "User(#{@id}, #{@name})"
    end
  end

  class UserRepository
    def initialize
      @users = {}
    end

    def find_by_id(id)
      @users[id]
    end

    def save(user)
      @users[user.id] = user
      puts "Saved #{user}"
    end

    def create_user(name, email)
      user = User.new(@users.size + 1, name, email)
      save(user)
      user
    end
  end
end
