package ds.pamiw.backend.shared;

public class PaginableResposne<T> {
    public T data;
    public int pageCount;

    public PaginableResposne(T data, int pageCount) {
        this.data = data;
        this.pageCount = pageCount;
    }
}
