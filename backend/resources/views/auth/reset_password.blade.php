<script>
    window.location.href = "http://localhost:3000/password-reset?token={{request('token')}}&email={{request('email')}}"
</script>