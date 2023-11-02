package ds.pamiw.backend.shared;

public class Pagination {
    public int page;
    public int take;

    public Pagination(int page, int take) {
        this.page = page;
        this.take = take;
    }
}
