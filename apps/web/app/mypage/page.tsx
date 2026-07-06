// apps/web/app/mypage/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MyPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('user_logs')
      .select('*')
      .then(({ data }: { data: Array<{ id: string; comment: string; rating: number }> | null }) =>
        setLogs(data ?? [])
      );
  }, []);

  return (
    <main>
      <h1>あなたの記録</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.comment}（★{log.rating}）</li>
        ))}
      </ul>
    </main>
  );
}
