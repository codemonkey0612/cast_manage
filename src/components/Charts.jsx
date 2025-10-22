import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#2798ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const ReservationsChart = ({ data }) => {
  const chartData = Object.entries(data).map(([date, reservations]) => ({
    date: date.split('T')[0],
    count: reservations.length
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">予約数の推移</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2798ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StoreDistributionChart = ({ data }) => {
  const chartData = Object.entries(data).map(([store, reservations]) => ({
    name: store,
    value: reservations.length
  }));

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">店舗別予約数</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CastPerformanceChart = ({ data }) => {
  const chartData = Object.entries(data).map(([cast, reservations]) => ({
    name: cast,
    reservations: reservations.length
  })).sort((a, b) => b.reservations - a.reservations);

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">キャスト別予約数</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="reservations" fill="#2798ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const WeeklyStats = ({ reservations }) => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const weeklyReservations = reservations.filter(r => {
    const reservationDate = new Date(r["日付"]);
    return reservationDate >= weekAgo && reservationDate <= today;
  });

  const dailyStats = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    dailyStats[dateStr] = 0;
  }

  weeklyReservations.forEach(r => {
    const date = r["日付"]?.toString().split('T')[0];
    if (date && dailyStats.hasOwnProperty(date)) {
      dailyStats[date]++;
    }
  });

  const chartData = Object.entries(dailyStats)
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
      count
    }))
    .reverse();

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">過去7日間の予約数</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
