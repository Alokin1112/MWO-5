package ds.pamiw.backend.models;


import jakarta.persistence.*;

@Entity
@Table
public class Book {

    @Id
    @SequenceGenerator(
            name = "book_squence",
            sequenceName = "book_squence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_squence"
    )
    private Long id;
    private String title;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    private Integer pageCount;
    private Double price;
    private String photoUrl;

    public Book(){}
    public Book(String title, Author author, Integer pageCount, Double price, String photoUrl) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.price = price;
        this.photoUrl = photoUrl;
    }
    public Book(Long id, String title, Author author, Integer pageCount, Double price, String photoUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.price = price;
        this.photoUrl = photoUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
//    CREATE SEQUENCE  IF NOT EXISTS book_squence START WITH 1 INCREMENT BY 1;
//
//        CREATE TABLE book (
//        id BIGINT NOT NULL,
//        title VARCHAR(255),
//        author_id BIGINT,
//        page_count INTEGER,
//        price DOUBLE PRECISION,
//        photo_url VARCHAR(255),
//        CONSTRAINT pk_book PRIMARY KEY (id)
//        );
//
//        ALTER TABLE book ADD CONSTRAINT FK_BOOK_ON_AUTHOR FOREIGN KEY (author_id) REFERENCES author (id);