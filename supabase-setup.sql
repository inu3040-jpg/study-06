-- shopping_items 테이블 생성
CREATE TABLE IF NOT EXISTS shopping_items (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  text       TEXT        NOT NULL,
  checked    BOOLEAN     DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- 공개 접근 정책 (anon key로 CRUD 허용)
CREATE POLICY "public_access" ON shopping_items
  FOR ALL USING (true) WITH CHECK (true);
