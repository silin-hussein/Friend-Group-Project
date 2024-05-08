package htl.leonding.bhitm.friendgroup.feature.chat.message;

import htl.leonding.bhitm.friendgroup.feature.Friend.Friend;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Message {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateSent;

    @ManyToOne(cascade = CascadeType.ALL)
    private Friend author;
    private String content;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateSent() {
        return dateSent;
    }

    public void setDateSent(LocalDateTime dateSent) {
        this.dateSent = dateSent;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
