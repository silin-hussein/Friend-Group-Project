package htl.leonding.bhitm.friendgroup.feature.Friend;

import htl.leonding.bhitm.friendgroup.feature.Note.Note;
import htl.leonding.bhitm.friendgroup.feature.calendar.Event.Event;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    private String username;
    private String firstName;
    private String lastName;
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "friend_id")
    private List<Note> notes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "friend_id")
    private List<Event> events;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public Friend(String description, String lastName, String firstName, String username) {
        this.description = description;
        this.lastName = lastName;
        this.firstName = firstName;
        this.username = username;
    }

    public Friend() {
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", firstname='" + firstName + '\'' +
                ", lastname='" + lastName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
