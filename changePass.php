<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="author" content="Muhamad Nauval Azhar">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="description" content="This is a login page template based on Bootstrap 5">
	<title>Bootstrap 5 Login Page</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
	<link rel="stylesheet" href="./css/style.css"/>
	 <!--CORE JS-->
	 <script type="text/javascript" src="./js/jquery-3.6.0.min.js"></script>
    <!------------------------------------------------------------------>   
	<script src="./js/sweetalert2.all.min.js"></script>
	<!------------------------------------------------------------------>
	<script defer type="text/javascript" src="./js/globalVariables.js"></script>
</head>

<body>
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-sm-center h-100">
				<div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div class="text-center my-5">
						<img src="./images/asti.ico" alt="logo" width="100">
					</div>
					<div class="card shadow-lg">
						<div class="card-body p-5">
							<h1 class="fs-4 card-title fw-bold mb-4">Approver Panel</h1>
							<form method="POST" class="needs-validation" novalidate="" autocomplete="off">
								<div class="mb-3">
									<label class="mb-2 text-muted" for="email">Employee Number</label>
									<input id="approverNo" type="number" class="form-control" name="email" placeholder="Emp. No." value="" required autofocus>
									<div class="invalid-feedback">
										Approver ID is invalid
									</div>
								</div>

								<div class="mb-3">
									<div class="mb-2 w-100">
										<label class="text-muted" for="password">Password</label>
										<!-- <a href="forgot.html" class="float-end">
											Forgot Password?
										</a> -->
									</div>
									<input id="approverPass" type="password" placeholder="New Password" class="form-control" name="password" required>
								    <div class="invalid-feedback">
								    	Password is required
							    	</div>
								</div>

								<div class="d-flex align-items-center">
									<!-- <div class="form-check">
										<input type="checkbox" name="remember" id="remember" class="form-check-input">
										<label for="remember" class="form-check-label">Remember Me</label>
									</div> -->
									<button type="submit" class="btn btn-primary ms-auto">
										Reset Password
									</button>
								</div>
							</form>
						</div>
						<!-- <div class="card-footer py-3 border-0">
							<div class="text-center">
								Don't have an account? <a href="register.html" class="text-dark">Create One</a>
							</div>
						</div> -->
					</div>
					<div class="text-center mt-5 text-muted">
						Copyright &copy; 2021 &mdash; Telford Services. Inc. 
					</div>
				</div>
			</div>
		</div>
	</section>

	<script src="js/changePass.js"></script>
</body>
</html>
