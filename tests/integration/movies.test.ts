import { describe, it, expect } from 'vitest';
import request from 'supertest';

// เราจะเทสไปที่ API ของ server ที่กำลังรันอยู่ (Black Box Testing)
const API_URL = 'http://localhost:4000';

describe('Movies API - Integration', () => {

  it('GET /movies should return a list of movies', async () => {
    const response = await request(API_URL).get('/movies');
    
    // ตรวจสอบว่า Status Code คือ 200
    expect(response.status).toBe(200);
    
    // ตรวจสอบว่าคืนค่าเป็น Array
    expect(Array.isArray(response.body)).toBe(true);
    
    // ตรวจสอบว่ามีข้อมูลหนัง (ถ้า DB มีข้อมูล)
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('id');
    }
  });

  it('GET /movies/invalid-id should return 404 or empty', async () => {
    const response = await request(API_URL).get('/movies/999999');
    // ขึ้นอยู่กับ logic ของ server ว่าจะคืน 404 หรือ 200 แต่ว่าง
    expect([200, 404]).toContain(response.status);
  });

});
