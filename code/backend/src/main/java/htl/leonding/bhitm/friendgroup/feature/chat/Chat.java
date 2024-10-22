package htl.leonding.bhitm.friendgroup.feature.chat;

import htl.leonding.bhitm.friendgroup.feature.chat.message.Message;
import htl.leonding.bhitm.friendgroup.feature.friend.Friend;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Chat {
    @GeneratedValue
    @Id
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "chat_id")
    private List<Message> messages;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "test_table")
    private List<Friend> friends;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void addMessage(Message message) {
        if (message == null || message.getId() == null) {
            throw new IllegalArgumentException();
        }

        this.messages.add(message);
    }

    public void removeMessage(Message message) {
        if (message == null || message.getId() == null) {
            throw new IllegalArgumentException();
        }

        this.messages.removeIf((m) -> message.getId().equals(m.getId()));
    }
}