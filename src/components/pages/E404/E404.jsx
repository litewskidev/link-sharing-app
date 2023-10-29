import './E404.scss';

const E404 = () => {
  return(
    <section id='e404'>
      <div className='e404__wrapper'>
        <h1>E404</h1>
        <p>The requested URL <span>{window.location.pathname}</span> was not found on this server.</p>
        <a href='https://devlinks.litewskidev.usermd.net'>Go back</a>
      </div>
    </section>
  );
};

export default E404;
