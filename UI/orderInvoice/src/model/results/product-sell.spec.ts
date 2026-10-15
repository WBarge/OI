import { ProductSell } from './product-sell';

describe('ProductSell', () => {
  it('should create an instance', () => {
    expect(new ProductSell()).toBeTruthy();
  });

  describe('setStartAndEndFromRange', () => {
    it('should copy the first and second date of the range into start and end', () => {
      const sell = new ProductSell();
      const start = new Date('2026-03-01');
      const end = new Date('2026-03-31');
      sell.rangeDates = [start, end];

      sell.setStartAndEndFromRange();

      expect(sell.start).toBe(start);
      expect(sell.end).toBe(end);
    });

    it('should leave start and end alone when no range has been picked', () => {
      const sell = new ProductSell();
      const start = new Date('2026-01-01');
      const end = new Date('2026-01-02');
      sell.start = start;
      sell.end = end;

      sell.setStartAndEndFromRange();

      expect(sell.start).toBe(start);
      expect(sell.end).toBe(end);
    });

    it('should leave start and end alone while only the first date of the range is picked', () => {
      const sell = new ProductSell();
      const start = new Date('2026-01-01');
      const end = new Date('2026-01-02');
      sell.start = start;
      sell.end = end;
      sell.rangeDates = [new Date('2026-05-05')];

      sell.setStartAndEndFromRange();

      expect(sell.start).toBe(start);
      expect(sell.end).toBe(end);
    });
  });
});
