<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#08090e">
  <meta name="description" content="ติดตามประกาศการแข่งขันอีสปอร์ต ACADEMY ลีก 2027">
  <title>@yield('title', 'ACADEMY LEAGUE 2027 — การแข่งขันอีสปอร์ต')</title>
  <link rel="stylesheet" href="{{ asset('css/site.css') }}">
  <script src="{{ asset('js/site.js') }}" defer></script>
</head>
<body>
  @include('partials.header')
  @yield('content')
  @include('partials.footer')
</body>
</html>
