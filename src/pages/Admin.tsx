import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Admin() {
  return (
    <div className="grid grid-cols-3">
      <Card className="rounded-2xl border border-white/80 bg-white/60 text-gray-900">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-wide text-gray-700">
            當前會員人數
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-gray-900 drop-shadow">
            5689
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Admin;
