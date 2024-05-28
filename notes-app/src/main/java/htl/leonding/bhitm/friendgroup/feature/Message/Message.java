package htl.leonding.bhitm.friendgroup.feature.Message;

import htl.leonding.bhitm.friendgroup.feature.Friend.Friend;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
public class Message {
    @GeneratedValue
    @Id
    private Long id;

    private LocalDateTime dateTime;
    private String content;
    @ManyToOne
    private Friend author;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Friend getAuthor() {
        return author;
    }

    public void setAuthor(Friend author) {
        this.author = author;
    }
}
